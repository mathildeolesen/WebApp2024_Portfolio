import { useCallback, useEffect, useState } from "react";
import projectsApi from "@/services/api"; // Henter fra services/api.ts
import type { Project } from "@/types";

type Status = "idle" | "loading" | "error" | "success" | "fetching";

export function useProjects() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<{ projects: Project[] } >({ projects: [] });
  const [error, setError] = useState<string | null>(null);

  // Computed verdier basert på status
  const isFetching = status === "fetching";
  const isLoading = status === "loading" || isFetching;
  const isError = status === "error" || !!error;
  const isIdle = status === "idle";
  const isSuccess = status === "success";

  // Funksjon for å tilbakestille status til idle etter en viss tid
  const resetToIdle = useCallback(
    (timeout = 2000) =>
      setTimeout(() => {
        setStatus("idle");
      }, timeout),
    []
  );

  // Funksjon for å hente prosjekter fra API-et
  const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await projectsApi.fetchProjects();
      setData({ projects: response }); // Setter prosjektene i state
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Feilet ved henting av prosjekter");
    } finally {
      resetToIdle();
    }
  }, [resetToIdle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Funksjon for å legge til et prosjekt
  const add = async (data: Partial<Project>) => {
    const { title = "", tags = [], description = "", createdAt = "" } = data;
    
    try {
        setStatus("loading");
        await projectsApi.create({ title, tags, description, createdAt});
        await fetchData();
        setStatus("success")
    } catch (error) {
        setStatus("error");
        setError("Failed to create project");
    } finally {
        resetToIdle();
    }
  };

  // Funksjon for å fjerne et prosjekt
  const remove = async (id?: string) => {
    if (!id) return;

    try {
        setStatus("loading");
        await projectsApi.remove(id);
        await fetchData();
        setStatus("success");
    } catch (error) {
        setStatus("error");
        setError("Failed to remove project");
    } finally {
        resetToIdle();
    }
  };

  // Returnerer status og data, samt add- og remove-funksjonene
  return {
    add,
    remove,
    get: fetchData,
    data,
    error,
    status: {
      idle: isIdle,
      loading: isLoading,
      success: isSuccess,
      error: isError,
      fetching: isFetching,
    },
  };
}

export default useProjects;
