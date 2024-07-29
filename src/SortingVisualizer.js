import React from 'react';
import './SortingVisualizer.css';

class Tuple
{
constructor(first,second,operation)
{
this.first=first;
this.second=second;
this.operation=operation;
}
}

class SortingVisualizer extends React.Component
{

constructor(props)
{
super(props);
this.state={
arr:[],
sortingAlgorithm:'',
size:'',
speed:'',
barColor:'',
pointerColor:'',
sort:false,
randomize:false
};
this.sorted=false;
this.width=0;
this.height=0;
}


componentDidMount()
{
this.width=window.screen.width;
this.height=window.screen.height;
let controllerData=this.props.controllerData;
let temp=new Set()
while(temp.size !== parseInt(controllerData['size']))
{
temp.add(this.getRandomElement());
}
temp=Array.from(temp);
this.setState({
arr:temp,
sortingAlgorithm:controllerData['sortingAlgorithm'],
size:controllerData['size'],
speed:controllerData['speed'],
barColor:this.getColor(controllerData['barColor']),
pointerColor:this.getColor(controllerData['pointerColor']),
sortedColor:this.getColor(controllerData['sortedColor']),
sort:controllerData['sort'],
randomize:controllerData['randomize']
})
}


componentDidUpdate(previousProps,previousState)
{
if(previousProps.controllerData !== this.props.controllerData)
{
let controllerData = this.props.controllerData;
let cd={};
if(controllerData['sort'] === true)
{
cd={
sortingAlgorithm:controllerData['sortingAlgorithm'],
size:controllerData['size'],
speed:controllerData['speed'],
barColor:this.getColor(controllerData['barColor']),
pointerColor:this.getColor(controllerData['pointerColor']),
sortedColor:this.getColor(controllerData['sortedColor']),
sort:controllerData['sort'],
randomize:controllerData['randomize']
}
switch(controllerData.sortingAlgorithm)
{ 

case "Quick Sort":
this.setState(cd,function(){
this.quickSortUtil()
});
break;


default:
this.setState(cd,function(){
this.quickSortUtil()
})
break;
}
}
else
{
let newState={};
let temp=new Set();
if(parseInt(this.state['size']) !== parseInt(controllerData['size']))
{
newState['sortingAlgorithm']=controllerData['sortingAlgorithm'];
newState['size']=parseInt(controllerData['size']);
newState['speed']=controllerData['speed'];
newState['barColor']=this.getColor(controllerData['barColor']);
newState['pointerColor']=this.getColor(controllerData['pointerColor']);
newState['sortedColor']=this.getColor(controllerData['sortedColor']);
newState['randomize']=controllerData['randomize'];
newState['sort']=controllerData['sort'];
while(temp.size !== newState['size'])
{
temp.add(this.getRandomElement());
}
temp=Array.from(temp);	
newState['arr']=temp;
}
else			
{
if(controllerData['randomize'] ===  true)
{
newState['sortingAlgorithm']=controllerData['sortingAlgorithm'];
newState['size']=parseInt(controllerData['size']);
newState['speed']=controllerData['speed'];
newState['barColor']=this.getColor(controllerData['barColor']);
newState['pointerColor']=this.getColor(controllerData['pointerColor']);
newState['sortedColor']=this.getColor(controllerData['sortedColor']);
newState['randomize']=controllerData['randomize'];
newState['sort']=controllerData['sort'];
while(temp.size !== newState['size'])
{
temp.add(this.getRandomElement());
}
temp=Array.from(temp);	
newState['arr']=temp;
let bars=document.getElementsByClassName('array-bar');
for(let e=0;e<bars.length;e++) bars[e].style.backgroundColor=newState['barColor'];
}
else
{
newState['sortingAlgorithm']=controllerData['sortingAlgorithm'];
newState['size']=parseInt(controllerData['size']);
newState['barColor']=this.getColor(controllerData['barColor']);
newState['pointerColor']=this.getColor(controllerData['pointerColor']);
newState['sortedColor']=this.getColor(controllerData['sortedColor']);
newState['speed']=controllerData['speed'];
newState['arr']=this.state.arr;
}
}
this.setState(newState);
}
} 
} //component did update end


async quickSortUtil()
{
this.sorted=false;
this.props.visualizerDataHandler(this.sorted);
let arr=this.state.arr.slice();
let low=0;
let high=arr.length-1;
let graphics=[];
let gValue,gWidth;
let sorted=this.state.arr.slice().sort(function(a,b){
return a-b;
});
this.quickSort(arr,low,high,graphics,sorted)
let bars=document.getElementsByClassName('array-bar');
for(let i=0;i<graphics.length;i++)
{
if(graphics[i].operation==='add')
{
bars[graphics[i].first].style.backgroundColor=this.state.pointerColor;
bars[graphics[i].second].style.backgroundColor=this.state.pointerColor
if(this.state.randomize === true ) return;
await this.sleep(this.getSpeed(this.state.speed)/2);
if(this.state.randomize === true ) return;
}
if(graphics[i].operation==='fix')
{
bars[graphics[i].first].style.backgroundColor=this.state.sortedColor;
bars[graphics[i].second].style.backgroundColor=this.state.sortedColor;
}
if(graphics[i].operation==='remove')
{
bars[graphics[i].first].style.backgroundColor=this.state.barColor;
bars[graphics[i].first].style.backgroundColor=this.state.barColor;
}
if(graphics[i].operation==='swap')
{
if(this.state.randomize === true ) return;
await this.sleep(this.getSpeed(this.state.speed)/2);
if(this.state.randomize === true ) return;
gValue=bars[graphics[i].first].innerHTML;
gWidth=bars[graphics[i].first].style.width;
bars[graphics[i].first].innerHTML=bars[graphics[i].second].innerHTML;
bars[graphics[i].first].style.width=bars[graphics[i].second].style.width;
bars[graphics[i].second].innerHTML=gValue;
bars[graphics[i].second].style.width=gWidth;
if(this.state.randomize === true ) return;
await this.sleep(this.getSpeed(this.state.speed)/2);
if(this.state.randomize === true ) return;
}
}
this.sorted=true;
this.props.visualizerDataHandler(this.sorted);
}

quickSort(arr,low,high,graphics,sorted) 
{ 
if (low < high) 
{ 
let pi = this.partition(arr, low, high,graphics,sorted); 
this.quickSort(arr, low, pi - 1,graphics,sorted); 
this.quickSort(arr, pi + 1, high,graphics,sorted); 
} 
} 

partition (arr,low,high,graphics,sorted) 
{ 
let g;
let pivot = arr[high]; 
let i = low - 1; 
graphics.push(new Tuple(high,high,'add')); 
for (let j = low; j <= high - 1; j++) 
{ 
graphics.push(new Tuple(j,j,'add'));
if (arr[j] < pivot) 
{ 
i++;
g=arr[i];
arr[i]=arr[j];
arr[j]=g;
graphics.push(new Tuple(i,j,'add'));
graphics.push(new Tuple(i,j,'remove'));
graphics.push(new Tuple(i,j,'swap'));
} 
graphics.push(new Tuple(j,j,'remove'));
} 
g=arr[i+1];
arr[i+1]=arr[high];
arr[high]=g;
graphics.push(new Tuple(i+1,high,'add')); 
graphics.push(new Tuple(i+1,high,'remove')); 
graphics.push(new Tuple(i+1,high,'swap'));
graphics.push(new Tuple(high,high,'remove'));
for(let k=0;k<arr.length;k++)
{
if(arr[k]===sorted[k]) 
{
graphics.push(new Tuple(k,k,'fix'));
}
}
graphics.push(new Tuple(i+1,i+1,'fix'));
return i + 1; 
} 

getTimeComplexity()
{
let n = parseInt(this.state.size);
let timeComplexity = {
best: `O(n log n)`,
average: `O(n log n)`,
worst: `O(n^2)`
};
return timeComplexity;
}


sleep(ms)
{
return new Promise(resolve => setTimeout(resolve,ms));
}

getSpeed(speed)
{
switch(speed)
{
case 'Very Fast':
return 25;
case 'Normal':
return 250;
case 'Slow':
return 500;
case 'Very Slow':
return 1000;
default:
return 100;
}
}

getColor(barColor)
{
switch(barColor)
{
case 'Black':
return '#000000'
case 'Cyan':
return '#00e6e6'
case 'Green':  
return '#009933'
case 'Pink':
return '#e600e6'
case 'Red':
return '#cc0000'
case 'Yellow': 
return '#cccc00'
default:
return '#000050'
}
}

getBarHeight()
{
let height=((this.height-150)-(parseInt(this.state.size)*5))/parseInt(this.state.size);
return height;
}

getfontHeight()
{
let fontHeight=((this.height-150)-(parseInt(this.state.size)*5))/parseInt(this.state.size);
return fontHeight-3;
}

getRandomElement()
{
var max=0;
var min=50;
if(this.width < 768) max=(this.width * 8)/10;
else max= (this.width * 6) /10
return Math.floor(Math.random() * (max - min + 1) + min);
}

render()
{
return(
<div id='barView'>
{
this.state.arr.map((value, idx) => (
<div className="array-bar" key={idx} style={
{
width:`${value + 10}px`,
backgroundColor:`${this.state.barColor}`,
height:`${this.getBarHeight()}px`,
fontSize :`${this.getfontHeight()}px`
}
}>
{value}
</div>
)
) 
}
</div>
) 
}  
} 

export default SortingVisualizer;