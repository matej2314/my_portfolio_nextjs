import { sseData } from "./streamSse";

interface TopicGateResult {
    allowed: boolean;
    topics?: string[];
    exampleQuestions?: Record<string, string[]>;
}

interface HandleNotAllowedTopicParams {
    topicCheck: TopicGateResult;
    SSE_HEADERS: Record<string, string>;
}

export const handleNotAllowedTopic = ({ topicCheck, SSE_HEADERS }: HandleNotAllowedTopicParams) => {
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(
                sseData({
                    type: 'rejected',
                    topics: topicCheck?.topics || [],
                    exampleQuestions: topicCheck.exampleQuestions,
                }),
            );
            controller.enqueue(sseData({ type: 'done' }));
            controller.close();
        },
    });

    return new Response(stream, {
        status: 200,
        headers: SSE_HEADERS,
    });
}