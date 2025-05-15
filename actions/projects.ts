'use server';

import { executeQuery } from "@/lib/db";

type Project = {
    project_name: string;
    project_category: string;
    project_URL: string;
    project_screenName: string;
    goal: string;
    project_description: string;
    repo: string;
    technologies: string;
    difficulty: string;
    end_date: string;
    long_text: string;
};

export async function getProjects() {

};

export async function saveProject() {

};

export async function updateProject() {

};

export async function deleteProject() {

};