export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch("http://localhost:8080/api/pengguna/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
