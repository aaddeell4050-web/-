const toArabicDigits = (num) => {
    let s = Math.round(num).toString();
    s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "،");
    const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return s.replace(/\d/g, d => arabicDigits[d]);
}
console.log(toArabicDigits(1234567));
console.log(Number(1234567).toLocaleString('ar-SA'));
