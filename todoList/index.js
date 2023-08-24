// 1.新增待辦功能
const inputText=document.getElementById('inputText');
const addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',addList);
let listData=[];
function addList(){
    // console.log('test');
    let list={
        txt:inputText.value,
        id:new Date().getTime(),
        checked:'',
    };
    if(inputText.value!=''){
        listData.unshift(list);
        console.log(listData);
        inputText.value='';
        
    }
    renewList();
}


// 2.渲染
const todolist=document.getElementById('todolist');
function render(arr){
    let str='';
    arr.forEach(i => {
        str+=
        `
        <li data-id='${i.id}'>
            <label class="checkbox" for="">
                <input type="checkbox" ${i.checked}/>
                <span>${i.txt}</span>
            </label>
                <a href="#" class="delete"></a>
        </li>
        `
    });
    todolist.innerHTML=str;
}

// 3.tab切換
const tab=document.getElementById('tab');
let toggleStatus='all';
tab.addEventListener('click',changeStatus);
function changeStatus(e){
    console.log(e.target.dataset.tab);
    toggleStatus=e.target.dataset.tab;
    let tabs=document.querySelectorAll('#tab li');
    tabs.forEach((i)=>{
        console.log(i.classList);
        i.classList.remove('active');
    });
    e.target.classList.add('active');
    renewList();
}

// 4.刪除&切換checked狀態
todolist.addEventListener('click',deleteAndSwitch);
function deleteAndSwitch(e){
    let id = e.target.closest('li').dataset.id;
    if(e.target.classList.value == 'delete'){
        e.preventDefault();
        listData = listData.filter((i)=>i.id != id);
    }else{
        listData.forEach((i,index)=>{
            if(i.id==id){
                if(listData[index].checked=='checked'){
                    listData[index].checked='';
                }else{
                    listData[index].checked='checked';
                }
            }
        });

    }
    renewList();
}

// 5.更新清單
function renewList(){
    let displayData=[];
    if(toggleStatus=='all'){
        displayData=listData;
    } else if(toggleStatus=='pending'){
        displayData=listData.filter((i)=>i.checked=='');
    } else {
        displayData=listData.filter((i)=>i.checked=='checked');
    }

    const workNum=document.getElementById('workNum');
    let listLength=listData.filter((i)=>i.checked=='')
    workNum.textContent=listLength.length;

    render(displayData);
}

// 初始化
renewList();

// 清除已完成項目
const deleteDone=document.getElementById('deleteDone');
deleteDone.addEventListener('click',deleteTask)

function deleteTask(e){
    e.preventDefault();
    listData=listData.filter((i)=>i.checked!='checked');
    renewList();
};

// 7.按鍵功能
inputText.addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    addList();
  }
});