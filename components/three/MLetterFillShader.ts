export const letterMVertexShader = `
varying vec3 vPos;
varying vec3 vNormal;

void main() {
	vPos = position;
	vNormal = normalize(normalMatrix * normal);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const letterMFragmentShader = `
uniform float uFill;
uniform float uYMin;
uniform float uYMax;
uniform vec3 uColor;
uniform float uFeather;
uniform float uVolumeShading;
varying vec3 vPos;
varying vec3 vNormal;

void main() {
	float denom = max(uYMax - uYMin, 1e-5);
	float t = (vPos.y - uYMin) / denom;
	float edge = smoothstep(uFill, uFill + uFeather, t);
	if (edge >= 1.0) discard;

	vec3 N = normalize(vNormal);
	vec3 albedo = uColor;

	if (uVolumeShading > 0.5) {
		// Dwa kierunki: główne + wypełnienie — widać przejścia na ścianach ekstruzji (ortho, bez obrotu mesha).
		vec3 Lk = normalize(vec3(0.58, 0.48, 0.72));
		vec3 Lf = normalize(vec3(-0.42, 0.28, 0.62));
		float nk = max(dot(N, Lk), 0.0);
		float nf = max(dot(N, Lf), 0.0);
		float diff = clamp(0.52 * nk + 0.28 * nf, 0.0, 1.0);
		// Wyższy „ambient” + łagodniejszy kontrast — bliżej jasności płaskiego SVG.
		diff = pow(diff * 0.5 + 0.5, 1.02);
		albedo = uColor * diff;

		float vz = abs(dot(N, vec3(0.0, 0.0, 1.0)));
		float sideMask = smoothstep(0.5, 0.12, vz);
		albedo *= mix(1.0, 0.92, sideMask);
		albedo += sideMask * uColor * 0.09;

		float rim = pow(1.0 - vz, 2.0) * 0.45;
		albedo += rim * uColor;
	}

	gl_FragColor = vec4(albedo, 1.0 - edge);
}
`;
