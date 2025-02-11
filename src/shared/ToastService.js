import { useToast } from "primevue/usetoast";


export const useToastService = () => {
  const toast = useToast();
  
  const showToast = (severity, summary, detail) => {
    toast.add({ severity, summary, detail, life: 7000 });
  };

  return { showToast };
};
