var form = document.getElementById('searchForm');
var input = document.getElementById('searchInput');
var results = document.getElementById('results');
var err = document.getElementById('error');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById("defaultOpen").click();
    const ticker = input.value;
    fetch(`https://assi2-415852.uc.r.appspot.com/company?ticker=${ticker}`)
        .then(response => response.json())
        .then(data => {
            if (data && Object.keys(data).length === 0) {
                results.style.display = 'none'
                err.style.display = 'block'
            }
            else {
                results.style.display = 'block';
                err.style.display = 'none'
            }
            console.log(data);
            const tab1Content = `<div class="company">
            <img class="company-img" src=${data.logo} />
                <table class="company-table>
                    <tr class="company-row">
                        <td class="company-cell first" style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Company Name  </td>
                        <td class="company-cell first" style="padding-left:15px;">${data.name}</td>
                    </tr>
                    <tr class="company-row">
                        <td class="company-cell" style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Stock Ticker Symbol  </td>
                        <td class="company-cell" style="padding-left:15px;">${data.ticker}</td>
                    </tr>
                    <tr class="company-row">
                        <td class="company-cell" style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Stock Exchange Code  </td>
                        <td class="company-cell" style="padding-left:15px;">${data.exchange}</td>
                    </tr>
                    <tr class="company-row">
                        <td class="company-cell" style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Company Start Date  </td>
                        <td class="company-cell" style="padding-left:15px;">${data.ipo}</td>
                    </tr>
                    <tr class="company-row">
                        <td class="company-cell" style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Category  </td>
                        <td class="company-cell" style="padding-left:15px;">${data.finnhubIndustry}</td>
                    </tr>
                </table>
            </div>`;
            document.getElementById('tab1').innerHTML = tab1Content;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch(`https://assi2-415852.uc.r.appspot.com/summary?ticker=${ticker}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            function displayArrows(val, ID) {
                if (val >= 0) {
                    return `${val} <img class="arrow" src="./images/GreenArrowUp.png"/>`
                } else {
                    return `${val} <img class="arrow" src="./images/RedArrowDown.png"/>`
                }
            }
            const tab2Content = `<div>
            <table style="margin-top:30px;">
                    <tr>
                        <td class="company-cell first" style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Stock Ticker Symbol</td>
                        <td class="company-cell first" style="padding-left:15px;">${ticker.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Trading Day</td>
                        <td style="padding-left:15px;">${formatDate(data.t)}</td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Previous Closing Price</td>
                        <td style="padding-left:15px;">${data.pc}</td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Opening Price</td>
                        <td style="padding-left:15px;">${data.o}</td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">High Price</td>
                        <td style="padding-left:15px;">${data.h}</td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Low Price</td>
                        <td style="padding-left:15px;">${data.l}</td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Change</td>
                        <td id="change" style="padding-left:15px;">${displayArrows(data.d, 'change')}</td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif;font-weight:bold;text-align:right;padding-left:15px;">Change Percent</td>
                        <td id="change-percent" style="padding-left:15px;">${displayArrows(data.dp, 'change-percent')}</td>
                    </tr>
                </table>
            </div>`;
            document.getElementById('tab2').innerHTML = tab2Content;
            fetch(`https://assi2-415852.uc.r.appspot.com/recommendation?ticker=${ticker}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    var tab2Content2 = document.createElement('div');
                    tab2Content2.innerHTML = `<div style="text-align:center;margin-top:15px;display:flex;flex-direction:row;margin-left:41%;">
                        <span style="color: #e80000;width:10px;display:flex;flex-direction:column;margin-right:45px;text-align:end;">Strong Sell</span>
                        <span style="background-color: #e80000;padding:10px;">${data[0].strongSell}</span>
                        <span style="background-color: #cb3c3c;padding:10px;">${data[0].sell}</span>
                        <span style="background-color: #3c8d44;padding:10px;">${data[0].hold}</span>
                        <span style="background-color: #bef9c4;padding:10px;">${data[0].buy}</span>
                        <span style="background-color: #9ff3a7;padding:10px;">${data[0].strongBuy}</span>
                        <span style="color: #9dfda5;width:10px;display:flex;flex-direction:column;margin-left:15px;">Strong Buy</span>
                        </div>
                        <div style="margin-top:15px;text-align:center;">Recommendation Trends</div>`;
                    document.getElementById('tab2').appendChild(tab2Content2);
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));

    fetch(`https://assi2-415852.uc.r.appspot.com/stocks?ticker=${ticker}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var date = new Date();
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            formattedDate = year + '-' + month + '-' + day;
            const priceDataPoints = data.results ? data.results.map(data => {
                return [data.t, data.c];
            })
                : null;

            const volumeDataPoints = data.results ? data.results.map(data => {
                return [data.t, data.v];
            })
                : null;
            console.log('Price Data Points:', priceDataPoints);
            console.log('Volume Data Points:', volumeDataPoints);
            Highcharts.stockChart('tab3', {
                chart: {
                    zoomType: 'x'
                },
                rangeSelector: {
                    selected: 0,
                    inputEnabled: false,
                    buttons: [
                        {
                            type: 'day',
                            count: 7,
                            text: '7d',
                        },
                        {
                            type: 'day',
                            count: 15,
                            text: '15d',
                        },
                        {
                            type: 'month',
                            count: 1,
                            text: '1m',
                        },
                        {
                            type: 'month',
                            count: 3,
                            text: '3m',
                        },
                        {
                            type: 'month',
                            count: 6,
                            text: '6m',
                        },

                    ]
                },
                title: {
                    text: `Stock Price ${ticker.toUpperCase()} ${formattedDate}`
                },
                subtitle: {
                    text: `<a target="_blank" href="https://polygon.io/" style="color:blue;text-decoration:underline;">Source: Polygon.io<a>`
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: [{

                    title: {
                        text: 'Stock Price'
                    },
                    opposite: false,

                }, {

                    title: {
                        text: 'Volume'
                    },
                    opposite: true,

                }],
                tooltip: {
                    split: true
                },
                series: [{
                    type: 'area',
                    name: 'Stock Price',
                    data: priceDataPoints,
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    }
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: volumeDataPoints,
                    yAxis: 1,
                    pointWidth: 4,
                    color: 'black',
                }],
                credits: {
                    enabled: false
                }
            });
        })
        .catch(error => console.error('Error:', error));

    fetch(`https://assi2-415852.uc.r.appspot.com/news?ticker=${ticker}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tab4Content = document.getElementById('tab4');
            const filteredData = data.filter(item => item.image);
            filteredData.slice(0, 5).forEach(data => {
                const tab4HTML = `
                <div class="news">
                    <img class="news-img" src="${data.image}" alt="News Image">
                    <div class="news-content">
                        <h3 class="news-h" >${data.headline}</h3>
                        <p class="news-p">${formatDate(data.datetime)}</p>
                        <a class="news-a" href="${data.url}" target="_blank">See Original Post</a>
                    </div>
                </div>`;
                tab4Content.innerHTML += tab4HTML;
            });

        })
        .catch(error => console.error('Error:', error));
});

function openTab(e, tabName) {
    var i, tabContent, tabLink;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLink = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLink.length; i++) {
        tabLink[i].className = tabLink[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    e.currentTarget.className += " active";
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function hideResults() {
    var results = document.getElementById('results');
    results.style.display = 'none';
    err.style.display = 'none'
}
