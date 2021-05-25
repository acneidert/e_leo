import _ from 'lodash'
export function queryRelated({ related, database }) {
  if (related === null || related.length === 0) return {};
  const relation = related.map(relate =>{
    relate.model = database.models[relate.model]
    return relate
  })
  const include = {
    include: relation
  };
  return include
}
