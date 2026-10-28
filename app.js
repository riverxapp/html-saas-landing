const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
const escapeHtml = text => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const tasks = [
 {title:'Explore homepage directions',tag:'Design',status:'todo',description:'A few ideas to get us started.',date:'Jun 24',owner:'AL',color:'peach',comments:2},
 {title:'Review competitor landscape',tag:'Research',status:'todo',description:'A fresh perspective on our space.',date:'Jun 25',owner:'JD',color:'purple',comments:3},
 {title:'Design system foundations',tag:'Design',status:'progress',description:'The building blocks of something good.',date:'Jun 23',owner:'AL',color:'peach',comments:4,art:true},
 {title:'Build homepage components',tag:'Development',status:'progress',date:'Jun 26',owner:'MK',color:'green',comments:2},
 {title:'Kickoff & project brief',tag:'Strategy',status:'done',description:'The start of something exciting.',date:'Jun 20',owner:'JD',color:'purple',comments:6},
 {title:'Gather inspiration',tag:'Design',status:'done',description:'A little spark for the journey.',date:'Jun 21',owner:'AL',color:'peach',comments:3}
];
let currentView = 'board', onlyMine = false;
function renderBoard(){
 $('#project-board').className = `board ${currentView === 'board' ? '' : currentView + '-view'}`;
 $('#project-board').innerHTML = [{id:'todo',title:'To do',color:'blue'},{id:'progress',title:'In progress',color:'orange'},{id:'done',title:'Done',color:'purple'}].map(column => {
 const items = tasks.filter(t => t.status === column.id && (!onlyMine || t.owner === 'JD'));
 return `<div class="board-column"><div class="column-head"><i class="small-dot ${column.color}"></i>${column.title}<span class="column-count">${items.length}</span><span class="column-add" aria-hidden="true">＋</span></div>${items.length ? items.map((t,i) => `<article class="task-card" style="animation-delay:${i*45}ms"><span class="task-tag ${t.tag.toLowerCase()}">${escapeHtml(t.tag)}</span>${t.art ? '<div class="task-art" aria-hidden="true"><i class="art-block"></i><i class="art-block"></i><i class="art-block"></i></div>' : ''}<h3>${escapeHtml(t.title)}</h3>${t.description ? `<p>${escapeHtml(t.description)}</p>` : ''}<div class="task-footer">${icon('clock')}<span>${t.date}</span><span class="task-comment">${icon('chat')}${t.comments}</span><span class="avatar avatar-${t.color}">${t.owner}</span></div></article>`).join('') : '<p class="empty-tasks">A little breathing room.<br>No tasks here yet.</p>'}</div>`;
 }).join('');
}
renderBoard();
$$('[data-view]').forEach(button => button.addEventListener('click', () => {currentView=button.dataset.view;$$('[data-view]').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-selected',selected)});renderBoard()}));
// Arrow keys follow the expected accessible tab behavior.
$('.view-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=$$('[data-view]');let index=tabs.indexOf(document.activeElement);index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[index].focus({preventScroll:true});tabs[index].click()});
$('#filter-tasks').addEventListener('click',()=>{onlyMine=!onlyMine;$('#filter-tasks').setAttribute('aria-pressed',onlyMine);$('#filter-tasks').setAttribute('aria-label',onlyMine?'Show all tasks':'Show my tasks');renderBoard();showToast(onlyMine?'Showing Jamie’s tasks':'Showing everyone’s tasks')});
function openDialog(id){$(id).showModal()}
$$('.dialog-close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
$$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()}}));
let toastTimer;
function showToast(message){clearTimeout(toastTimer);$('#toast-message').textContent=message;$('.toast').classList.add('show');toastTimer=setTimeout(()=>$('.toast').classList.remove('show'),4200)}
$$('[data-start]').forEach(button=>button.addEventListener('click',()=>{$('#selected-plan').textContent=button.dataset.plan?`${button.dataset.plan} plan · Concept preview`:'';openDialog('#start-dialog')}));
$('#workspace-form').addEventListener('submit',event=>{event.preventDefault();const name=$('#workspace-name').value.trim();if(!name){$('#workspace-name').setCustomValidity('Give your workspace a name.');$('#workspace-name').reportValidity();return}const label=`${name} workspace`;$('.workspace-switch strong').textContent=label;$('.workspace-switch strong').title=label;$('.workspace-icon').textContent=name.charAt(0).toUpperCase();try{localStorage.setItem('orbit-workspace',name)}catch{}$('#start-dialog').close();$('#demo').scrollIntoView({behavior:'smooth',block:'center'});showToast(`Welcome to ${name}. Your workspace preview is ready.`)});
$('#workspace-name').addEventListener('input',()=>$('#workspace-name').setCustomValidity(''));
try{const saved=localStorage.getItem('orbit-workspace');if(saved){$('.workspace-switch strong').textContent=`${saved} workspace`;$('.workspace-icon').textContent=saved.charAt(0).toUpperCase();$('#workspace-name').value=saved}}catch{}
$('#new-task').addEventListener('click',()=>openDialog('#task-dialog'));
$('#task-form').addEventListener('submit',event=>{event.preventDefault();const title=$('#task-name').value.trim();if(!title){$('#task-name').setCustomValidity('Add a task name.');$('#task-name').reportValidity();return}tasks.push({title,tag:'Design',status:$('#task-status').value,date:'Today',owner:'JD',color:'purple',comments:0});renderBoard();$('#task-dialog').close();$('#task-form').reset();showToast('A fresh idea, added to your board.')});
$('#task-name').addEventListener('input',()=>$('#task-name').setCustomValidity(''));
$$('[data-billing]').forEach(button=>button.addEventListener('click',()=>{const yearly=button.dataset.billing==='yearly';$$('[data-billing]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button)});$('#pro-price').textContent=yearly?'9.60':'12';$('#business-price').textContent=yearly?'19.20':'24';$('.pricing-note').textContent=yearly?'Annual billing · Illustrative plans for the Orbit product concept.':'Illustrative plans for the Orbit product concept. Explore the workspace preview for free.'}));
const tour=[{title:'Give every idea a home.',text:'Start with a project. Add the tasks, context, and people that will move it forward. Everything belongs in one clear workspace.',icon:'layers'},{title:'Find your point of view.',text:'Switch between a board, a focused list, and a timeline. Try the view tabs in the interactive preview to see your sample work differently.',icon:'grid'},{title:'Make a little progress.',text:'Add your first task, filter to your priorities, and make the workspace your own. Small steps make room for the next big thing.',icon:'spark'}];
let tourIndex=0;
function renderTour(){const step=tour[tourIndex];$('#tour-content').innerHTML=`<h2>${step.title}</h2><p>${step.text}</p>`;$('.tour-visual>svg').innerHTML=`<use href="#${step.icon}"/>`;$('#tour-progress').textContent=`0${tourIndex+1} / 03`;$('#tour-next').innerHTML=`${tourIndex===2?'Try it yourself':'Next'} ${icon('arrow')}`}
$('#watch-demo').addEventListener('click',()=>{tourIndex=0;renderTour();openDialog('#tour-dialog')});
$('#tour-next').addEventListener('click',()=>{if(tourIndex<2){tourIndex++;renderTour()}else{$('#tour-dialog').close();$('#demo').scrollIntoView({behavior:'smooth',block:'center'});$('#new-task').focus({preventScroll:true})}});
const integrations=[['S','Slack','Keep project updates close to the conversation.'],['N','Notion','Bring documentation and project context together.'],['F','Figma','Keep design files alongside the work.'],['GH','GitHub','Follow code changes from the project board.'],['G','Google Drive','Give shared files a home in every project.'],['L','Linear','Keep issues connected across your workflow.']];
$('#integration-catalog').innerHTML=integrations.map(([letter,name,description])=>`<div class="catalog-item"><span>${letter}</span><div><strong>${name}</strong><p>${description}</p></div></div>`).join('');
$('#explore-integrations').addEventListener('click',()=>openDialog('#integrations-dialog'));
$('.menu-button').addEventListener('click',()=>{const isOpen=$('.menu-button').getAttribute('aria-expanded')!=='true';$('.menu-button').setAttribute('aria-expanded',isOpen);$('.nav-links').classList.toggle('open',isOpen)});
$$('.nav-links a').forEach(link=>link.addEventListener('click',()=>{$('.nav-links').classList.remove('open');$('.menu-button').setAttribute('aria-expanded','false')}));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});$$('.reveal').forEach(element=>observer.observe(element))}
