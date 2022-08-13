const datas = [];
const STORAGE_KEY = 'Notes-Data';
const RENDER_EVENT = 'render-data';

//domcontentooad tempat utama perkumpulan funcion dieksekusi
document.addEventListener('DOMContentLoaded', function () {
    const tombol = document.getElementById('tombol');
    tombol.addEventListener('click', () => {
        addData(); dataStorage();
    });    
    ambilData();
});







//core data
function addData() {
    const id = +new Date();
    const inputan = document.getElementById('input').value;
    const object = {id, inputan};
    datas.push(object);
    document.dispatchEvent(new Event(RENDER_EVENT)); 
}

function makeData(dataObject) {
    const p = document.createElement('p');
    p.innerHTML = dataObject.inputan;

    const container = document.createElement('div')
    container.classList.add('box-item');
    container.append(p);
    return container;
}

document.addEventListener(RENDER_EVENT, function () {  
    const root = document.getElementById('root'); root.innerText = '';
    for (dataItem of datas) {
      const dataElement = makeData(dataItem);
      root.append(dataElement);
    }
});











// local storage
function dataStorage() {
    if(typeof(Storage) === undefined){
        alert('browser tidak mendukung web storage')
    }else{
        const parsed = JSON.stringify(datas);
        sessionStorage.setItem(STORAGE_KEY, parsed);
    }
}

function ambilData() {
    const getLocalStorage = sessionStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(getLocalStorage);

    if(data !== null){
        for(const a of data){
            datas.push(a);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
    console.table(datas);
}