
const d = new Date();
const m = d.getMonth();
const price = 150000;
const per = 13;

console.log(getSchedule(
    price,
    findSumByMonth(price, 60, per, d, m),
    per,
    d,
    m
))