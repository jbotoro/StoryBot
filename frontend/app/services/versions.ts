import axiosInstance from "@/utils/axiosInstance";

const BASE_URL = '/stories';

export const fetchVersions = async (storyId: number) => {
    try {
      const response = await axiosInstance.get(`/stories/${storyId}/versions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const revertVersion = async (storyId: number, versionIndex: number) => {
  const response = await axiosInstance.post(`${BASE_URL}/${storyId}/revert`, { version_index: versionIndex });
  return response.data;
};
