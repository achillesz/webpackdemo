import {} from './index.css'

$('#app').text('hello ');

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


