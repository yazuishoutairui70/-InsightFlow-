export const KEY='insightflow.history.v1';
export function getHistory(){try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value:[];}catch{return [];}}
export function saveReport(payload){
  const record={id:crypto.randomUUID(),createdAt:payload.meta.generatedAt,productName:payload.report.productName,category:payload.report.category,payload};
  try{
    const history=[record,...getHistory()].slice(0,20);
    localStorage.setItem(KEY,JSON.stringify(history));
    return true;
  }catch{return false;}
}
export function getReport(id){return getHistory().find(item=>item.id===id)||null;}
export function deleteReport(id){try{localStorage.setItem(KEY,JSON.stringify(getHistory().filter(item=>item.id!==id)));return true;}catch{return false;}}
