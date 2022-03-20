var VND = document.querySelectorAll('.vnd')
for (var i = 0; i < VND.length; i++) {
    let numberVnd = Number(VND[i].textContent)
    numberVnd = numberVnd.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    document.querySelectorAll('.vnd')[i].textContent = numberVnd
}

var totalVND = document.querySelectorAll('.totalVnd')
for (var i = 0; i < totalVND.length; i++) {
    let numberTotalVND = Number(totalVND[i].textContent)
    numberTotalVND = numberTotalVND.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    console.log(numberTotalVND)
    document.querySelectorAll('.totalVnd')[i].textContent = numberTotalVND
}