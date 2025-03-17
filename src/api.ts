const apiRequest = async (url: string, method: string, body?: object) => {
  const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(await response.text()); // Throw an error if the response is not okay
  }
  return response.json();
};

export { apiRequest };
