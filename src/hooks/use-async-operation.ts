

import { useState } from "react";
// import { enqueueSnackbar } from "notistack";
// import { ERROR_MESSAGES } from "@/utils/constants";

type AsyncOperation<TParams = void, TResult = void> = (params: TParams) => Promise<TResult>;

type UseAsyncOperationReturn<TParams, TResult> = [
  (params: TParams) => Promise<TResult | null>,
  boolean
] & {
  executeOperation: (params: TParams) => Promise<TResult | null>;
  loading: boolean;
};

function useAsyncOperation<TParams = void, TResult = void>(
  operation: AsyncOperation<TParams, TResult>
): UseAsyncOperationReturn<TParams, TResult> {
  const [loading, setLoading] = useState(false);

  const executeOperation = async (params: TParams): Promise<TResult | null> => {
    setLoading(true);
    try {
      const result = await operation(params);
      return result;
    } catch (error: any) {
      // enqueueSnackbar(error?.message || ERROR_MESSAGES.common, {
      //   variant: "error",
      // });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const hookData = [executeOperation, loading] as UseAsyncOperationReturn<TParams, TResult>;
  hookData.executeOperation = executeOperation;
  hookData.loading = loading;

  return hookData;
}

export default useAsyncOperation;
