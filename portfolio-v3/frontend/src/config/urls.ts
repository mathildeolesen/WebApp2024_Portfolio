

const baseUrl = import.meta.env.baseUrl ?? "http://localhost:3000";
const endpointsV1 = {
  projects: `${baseUrl}/v1/projects`,
  experiences: `${baseUrl}/v1/experiences`,
};

export { baseUrl, endpointsV1 as endpoints };