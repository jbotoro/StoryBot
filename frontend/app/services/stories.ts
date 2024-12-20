import axiosInstance from "@/utils/axiosInstance";


export const createStory = async (content: string) => {
    const response = await axiosInstance.post('/stories', { content });
    return response.data;
};

export const updateStory = async (storyId: number, content: string) => {
    const response = await axiosInstance.put(`/stories/${storyId}`, { content });
    return response.data;
};