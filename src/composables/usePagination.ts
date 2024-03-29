import { computed, ref } from "vue";

export function usePagination(pageSize: number) {
  const pagination = ref({
    page: 1,
    totalElements: pageSize + 1
  });

  const pageCount = computed(() => Math.ceil(pagination.value.totalElements / pageSize));
  const isNextPage = computed(() => pagination.value.page < pageCount.value);

  return { pagination, pageCount, isNextPage };
}
