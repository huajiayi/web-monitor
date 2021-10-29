import type { Moment } from 'moment';
import moment from "moment";

/**
 * 格式化日期 yyyy-MM-DD HH:mm:ss
 * @param date 日期或moment对象
 * @returns 日期
 */
 export const formatDateTime = (datetime: string | Moment) => moment(datetime).format('yyyy-MM-DD HH:mm:ss');

export const withPaginationProps = (tableProps: any) => {
  tableProps.pagination = Object.assign(tableProps.pagination, {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [10, 20],
    showTotal: (total: any, current: any) => `第 ${current[0]} ~ ${current[1]}条 / 共 ${total} 条`,
  });

  return tableProps;
};