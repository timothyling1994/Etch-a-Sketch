function creategrid(){
	
	let num = arguments[0] || 50;

	let grid = document.querySelector("#grid");
	let grid_template_str = "";
	let vh_fraction = 60/num;

	for(let i=0;i<num;i++)
	{
		grid_template_str += vh_fraction+"vh ";
	}

	let attributeColumnStr = "grid-template-columns:" + grid_template_str+";";
	let attributeRowStr = "grid-template-rows:" + grid_template_str+";";


	grid.style["grid-template-columns"] = grid_template_str;
	grid.style["grid-template-rows"] = grid_template_str;
	
	for(let i=0;i<(num*num);i++)
	{
		let label = 'box-' + i;
		let text;
		let grid_element = document.createElement("div");

		text_node = document.createTextNode('');
		grid_element.appendChild(text_node);

		let heightStr = "min-height:" + vh_fraction+"vh;";
		let widthStr = "min-width:"+vh_fraction+"vh;";
		let paddingStr = "padding:0.1px;";

		grid_element.setAttribute("class","gridelement");
		grid_element.setAttribute("style",heightStr+widthStr+paddingStr);
		grid_element.setAttribute("id",label);

		grid_element.addEventListener("mouseover",function(){
			this.style["background-color"]="pink";
		});

		let grid_container = document.querySelector("#grid");
		grid_container.appendChild(grid_element);
	}

}

function initSlider()
{
	let slider = document.getElementById("myRange");
	let output = document.getElementById("demo");
	output.innerHTML = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	  output.innerHTML = this.value;
	  deleteGrid();
	  creategrid(this.value);  
	}
}

function deleteGrid()
{
	let nodelist = document.querySelectorAll(".gridelement");
	  nodelist.forEach(node => {
	  	node.parentNode.removeChild(node);
	 });
}

function changeColor(){
	let nodelist = document.querySelectorAll(".gridelement");
	let color_change = "";
	let randomize = false;

	if(this.value=="rainbow")
	{
		randomize=true;
	}

	else
	{
		color_change = this.value;
	}
	
	nodelist.forEach(node => {
		node.addEventListener("mouseover",function(){
			if(!randomize)
			{
				this.style["background-color"]=color_change;
			}
			else
			{
				let rgb1 = Math.random()*(255);
				let rgb2 = Math.random()*(255);
				let rgb3 = Math.random()*(255);

				console.log('rgb(' + rgb1 + ',' + rgb2 + ',' + rgb3 + ')');
				this.style["background-color"]='rgb(' + rgb1 + ',' + rgb2 + ',' + rgb3 + ')';
			}
		});
	});
}

function initButtons()
{
	let nodelist = document.querySelectorAll(".buttonColor");
	nodelist.forEach(node => {
		node.addEventListener("click",changeColor);
	})

	nodelist = document.querySelectorAll("#clear-btn");
	nodelist.forEach(node => {
		node.addEventListener("click",clearGrid);
	})
}

function clearGrid()
{
	let nodelist = document.querySelectorAll(".gridelement");
	nodelist.forEach(node => {
		node.style["background-color"]="white";
	});
}

function theDomHasLoaded(e) {
	creategrid();
	initButtons();
	initSlider();
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);