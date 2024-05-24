const openModalButton=document.querySelector('.quick-action .icon.add');
const modRef=document.querySelector('.modal');
const closeModalButton=document.querySelector('.modal .right-section .close');
const textArearef=document.querySelector('.modal textarea');
const priorityBoxRef=document.querySelectorAll('.modal .right-section .priority-filter .box');
const tasks=[];
const ticketSectionRef=document.querySelector('.ticket-section');
// const new


function openModal(){
    modRef.classList.remove('hide');
};

function closeModal(){
    modRef.classList.add('hide');
};
openModalButton.addEventListener('click',function(){
  const isHideAvail= [...modRef.classList].includes('hide');
    if(isHideAvail){  
  modRef.classList.remove('hide');
}else{
    modRef.classList.add('hide');
}

});

closeModalButton.addEventListener('click',function(){
    modRef.classList.add('hide');
});

textArearef.addEventListener('keyup',function(e){
    if(e.key==='Shift'){
        const description =e.target.value;
        const priority=getSelectedPriority();
        // TODO:append to list 
       tasks.push({
        id:tasks.length+1,
        description:description,
        priority:priority
       });
    //    console.log(tasks);
       listTickets(tasks);
        closeModal();
    }

});
function getSelectedPriority(){
    let priority='';
    priorityBoxRef.forEach(function(boxes,idx){
        if([...boxes.classList].includes('selected')){
            priority=`p${idx+1}`;
        }
        
    });
    return priority;
}
function removeSelectedClass(){
    priorityBoxRef.forEach(function(boxes){
        boxes.classList.remove('selected');
    });
}

function addSelectedClasstoCurrBox(currBox){
    currBox.classList.add('selected');
};
priorityBoxRef.forEach(function(boxRef){
    boxRef.addEventListener('click',function(e){
        removeSelectedClass();

        addSelectedClasstoCurrBox(e.target);

    });

});

function createTicket(ticket){
    return `
   
    <div class="ticket-priority ${ticket.priority}"></div>
    <div class="ticket-id">${ticket.id}</div>
    <div class="ticket-content">
        <textarea  name="" id="" disabled>${ticket.description}</textarea>
    </div>
    <div class="ticket-lock locked">
    <i class="fa-solid fa-lock"></i>
    <i class="fa-solid fa-lock-open"></i>
    
    
    </div>

    `;
}
function clearList(){
    ticketSectionRef.innerHTML='';
};
function listTickets(tickets){
    clearList();
    tickets.forEach((ticket)=>{
        
        const ticketHTML=createTicket(ticket);
        const ticketContainerRef=document.createElement('div');
        ticketContainerRef.setAttribute('class','ticket-container');
        ticketContainerRef.setAttribute('data-id',ticket.id);
        ticketContainerRef.innerHTML=ticketHTML;
        ticketSectionRef.appendChild(ticketContainerRef);


 
    });

}

ticketSectionRef.addEventListener('click',function(e){
    if([...e.target.classList].includes('fa-solid')){
        // console.log(e.target);
        const currentTicketContainer=e.target.closest('.ticket-container');
        const currentTicketId=currentTicketContainer.getAttribute('data-id');
        // console.log(currentTicketId);
        const currTextArea=currentTicketContainer.querySelector('.ticket-content textarea');
        const lockRef=currentTicketContainer.querySelector('.ticket-lock');
        const isEditable=lockRef.classList.contains('locked');
        if(isEditable){
            lockRef.classList.remove('locked');
            currTextArea.removeAttribute('disabled');
        }
        else{
            lockRef.classList.add('locked');
            currTextArea.setAttribute('disabled',true);
        }

    }
});
