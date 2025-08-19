import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getOverlays = () => axios.get(`${API_URL}/overlays`);
export const createOverlay = (overlay: any) => axios.post(`${API_URL}/overlays`, overlay);
export const updateOverlay = (id: string, overlay: any) => axios.put(`${API_URL}/overlays/${id}`, overlay);
export const deleteOverlay = (id: string) => axios.delete(`${API_URL}/overlays/${id}`);
