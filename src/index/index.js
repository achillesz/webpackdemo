import {} from './index.css'

$('#app').text('hello 11');

$.ajax({
    url: 'c.json',
    type: 'get',
    dataType: 'json',
    data: {},
    success() {},
    error(){
        console.log(1)
        console.log(1)
    },
    complete() {}
});


