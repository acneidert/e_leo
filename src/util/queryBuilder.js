import { Op } from 'sequelize';
export function queryBuilder({ query, cols }) {
  if (query === null || query === '') return {};
  const qry = cols.map((col) => {
    const obj = {};
    obj[col] = { [Op.substring]: query };
    return obj;
  });
  const where = {
    where: {
      [Op.or]: qry,
    },
  };
  return where
}
