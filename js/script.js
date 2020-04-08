$(document).ready(function () {


    $.ajax({
            url: 'http://157.230.17.132:4016/sales',
            method: 'GET',
            success: function (data) {
                var mesiTot = []
                var oggettoVuoto = {};
                for (var i = 0; i < data.length; i++) {
                    var oggetto = data[i]
                    var mese = oggetto.date;
                    var dataMese = moment(mese, "DD-MM-YYYY").clone().format('MMMM');
                    console.log(oggetto);
                    console.log(mese);
                    console.log(dataMese);

                    if (oggettoVuoto[dataMese] === undefined) {
                        oggettoVuoto[dataMese] = 0

                    }
                    oggettoVuoto[dataMese] += oggetto.amount;
                    console.log(oggettoVuoto);
                }
                for (var key in oggettoVuoto) {
                    mesiTot.push(oggettoVuoto[key])
                    console.log(mesiTot);

                }


                var ctx = document.getElementById('grafico').getContext('2d');
                var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Septmber','October','November','Dicember'],
                    datasets: [{
                        label: 'Vendite per mese',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: mesiTot
                    }]
                },

                // Configuration options go here
                options: {}

                });




            }





    });

    $.ajax({
            url: 'http://157.230.17.132:4016/sales',
            method: 'GET',
            success: function (data) {
                var vendTot = []
                var insiemeVuoto = {};
                var nomiVendor = [];
                var totaleVendite = 0;
                var percentualeVendite = [];
                for (var i = 0; i < data.length; i++) {
                    var oggetto = data[i]
                    var venditore = oggetto.salesman;


                    if (insiemeVuoto[venditore] === undefined) {
                        insiemeVuoto[venditore] = 0

                    }
                    insiemeVuoto[venditore] += oggetto.amount;

                }
                for (var key in insiemeVuoto) {
                    vendTot.push(insiemeVuoto[key])
                    nomiVendor.push(key)


                }
                for (var i = 0; i < vendTot.length; i++) {
                    totaleVendite += vendTot[i];
                }
                for (var i = 0; i < vendTot.length; i++) {
                    vendTot[i] = ((vendTot[i] / totaleVendite) * 100);
                    percentualeVendite[i] = Math.round(vendTot[i] * 100) / 100;
                }


                var ctx = document.getElementById('torta').getContext('2d');
                var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'pie',

                // The data for our dataset
                data: {
                    labels: nomiVendor,
                    datasets: [{
                        label: 'Percentuale per venditore ',
                        backgroundColor: ['brown', 'lightgreen', 'lightcoral', 'purple'],
                        borderColor: 'rgb(255, 99, 132)',
                        data: percentualeVendite
                    }]
                },

                // Configuration options go here
                options: {}

                });




            }

        });

});
