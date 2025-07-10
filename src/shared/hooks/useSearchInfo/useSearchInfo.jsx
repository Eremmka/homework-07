import { useEffect, useState } from "react";
import axios from "axios";

export const useSearchInfo = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    setLoading(true);
    setError(false);
    
    let cancel;
    axios({
      method: 'GET',
      url: `${url}?page=${page}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setData(prevData => {
        return [...prevData, ...(res.data.results || [])].filter((item, index, self) =>
          index === self.findIndex(t => t.id === item.id)
        );
      });
      setHasMore(res.data.info?.next !== null);
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) return;
      setError(true);
      setLoading(false);
    });

    return () => cancel();
  }, [url, page]);

  return {
    loading,
    error,
    data,
    hasMore,
  };
}