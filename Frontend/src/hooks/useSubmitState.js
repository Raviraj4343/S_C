import { useState } from "react";

export const useSubmitState = (submitFn) => {
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    try {
      return await submitFn(payload);
    } finally {
      setLoading(false);
    }
  };

  return { loading, submit };
};
