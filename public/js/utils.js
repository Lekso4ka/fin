const formatMoney = (n) => {
    return +(Math.ceil(n * 100) / 100).toFixed(2);
}

const getDate = (d, m) => {
    const time = new Date(
        d.getFullYear(),
        d.getMonth() + m
    )
    const month = time.getMonth();
    const year = time.getFullYear();
    const start = new Date(year, 0,).getTime();
    const end = new Date(year + 1, 0).getTime();
    const yearDays = (end - start) / (1000 * 60 * 60 * 24);
    const daysCnt = new Date(year, month + 1, -1, 24).getDate();
    return {
        month,
        year,
        daysCnt,
        yearDays
    };
}

const findSumByMonth = (price, n, per, startTime, currentMonth) => {
    let resultPrice = price;
    let cnt = n;
    let result = 0;
    const monthPay = formatMoney(price / n);
    while(cnt--) {
        const date = getDate(startTime, currentMonth)
        currentMonth++;
        const monthPer = formatMoney((resultPrice * (per / 100) * date.daysCnt) / date.yearDays);
        resultPrice = formatMoney(resultPrice - (monthPay - monthPer));
        result = formatMoney(result + monthPay + monthPer);
    }
    return formatMoney(result / n);
}

const getSchedule = (price, pay, per, startTime, currentMonth) => {
    const data = [];
    while (price - pay > 0) {
        const result = {}
        result.price = price;
        const date = getDate(startTime, currentMonth);
        currentMonth++;
        const pr = formatMoney((price * (per / 100)) / date.yearDays * date.daysCnt)
        result.per = pr
        const p = formatMoney(pay - pr);
        result.pay = p;
        result.sum = pay;
        price = formatMoney(price - p);
        data.push(result)
    }
    const r= {}
    r.price = price;
    const date = getDate(startTime, currentMonth);
    currentMonth++;
    const pr = formatMoney((price * (per / 100)) / date.yearDays * date.daysCnt)
    r.per = pr
    r.pay = price;
    r.sum = formatMoney(price + pr);
    data.push(r)
    return data;
}