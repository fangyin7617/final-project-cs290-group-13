/*
 * Write your JS code in this file.  Don't forget to include your name and
 * @oregonstate.edu email address below.
 *
 * Name: Youngjoo Lee
 * Email: leey3@oregonstate.edu
 */

var allposts = [];


window.addEventListener('DOMContentLoaded', function()
{
	var content = document.getElementsByClassName('post');
	for(var i = 0 ; i < content.length; i++)
	{
		allposts.push(content[i]);
	}
});

/* Part 1: filter*/
function text_filter(text, filtered)
{
	var check = null;
	if(text.trim() != "")
	{
		text = text.toLowerCase().split(" ");
		for(var i = 0 ; i < filtered.length; i++)
		{
			check = filtered[i].textContent.toLowerCase().split(" ");
			for(var j = 0 ; j < check.length; j++)
			{
				if(text.includes(check[j]))
				{
					break;
				}
				else if(!text.includes(check[j]) && j+1 == check.length)
				{
					document.getElementById("posts").removeChild(filtered[i]);
				}
			}
		}
	}
}

function price_filter(min_b, max_b, filtered)
{
	var min = parseInt(min_b);
	var max = parseInt(max_b);
	var check = null;
	for(var i = 0 ; i < filtered.length; i++)
	{
		check = parseInt(filtered[i].getAttribute('data-price'));
		if(check > max || check < min)
		{
			document.getElementById("posts").removeChild(filtered[i]);
		}
	}
}

function city_filter(city, filtered)
{
	var check = null;
	if(city != "")
	{
		for(var i = 0 ; i < filtered.length; i++)
		{
			check = filtered[i].getAttribute('data-city');
			if(city.toLowerCase() != check.toLowerCase())
			{
				document.getElementById("posts").removeChild(filtered[i]);
			}
		}
	}
}

function condition_filter(condition, filtered)
{
	var check = null;
	for(var i = 0 ; i < filtered.length; i++)
	{
		check = filtered[i].getAttribute('data-condition');
		if(!condition.includes(check) && condition != "")
		{
			document.getElementById("posts").removeChild(filtered[i]);
		}
	}	
}


function filter(text, min, max, city, condition)
{
	for(var i = 0; i < allposts.length; i++)
	{
		document.getElementById("posts").appendChild(allposts[i]);
	}
	

	text_filter(text, windowpost());
	price_filter(min, max, windowpost());
	city_filter(city, windowpost());
	condition_filter(condition, windowpost());

}
function windowpost()
{
	var posted = [];
	var content = document.getElementsByClassName('post');
	for(var i = 0; i < content.length; i++)
	{
		posted.push(content[i]);
	}
	return posted;

}
function check_box(fieldset)
{
	var checked = [];
	var inputs = document.getElementsByName(fieldset);
	for(var i = 0 ; i < 5 ; i++)
	{
		if(inputs[i].checked)
		{
			checked.push(inputs[i].value);
		}
	}
	return checked;
}
var update_button = document.querySelector('.action-button');
update_button.addEventListener('click', 
	function (event) {
		var filterText = document.getElementById("filter-text").value;
		var min = document.getElementById("filter-min-price").value;
		var max = document.getElementById("filter-max-price").value;
		var filterCity = document.getElementById("filter-city").value;
		filter(filterText, min, max, filterCity, check_box('filter-condition'));
	}	
);
/* Part1: filter End */


/* Part 2, 3: open and close modal */
var add_button = document.querySelector('#sell-something-button');
add_button.addEventListener('click', function(event)
	{
		document.getElementById("sell-something-modal").classList.remove('hidden');
		document.getElementById("modal-backdrop").classList.remove('hidden');
	}
)

var close_button = document.querySelector('#modal-close');
close_button.addEventListener('click', reset);	

var cancle_button = document.querySelector('#modal-cancel');
cancle_button.addEventListener('click', reset);	

function reset()
{
	document.getElementById("post-text-input").value = "";
	document.getElementById("post-price-input").value = "";
	document.getElementById("post-city-input").value = "";
	document.getElementById("post-condition-new").checked = true;
	document.getElementById("post-photo-input").value = "";
	document.getElementById("sell-something-modal").classList.add('hidden');
	document.getElementById("modal-backdrop").classList.add('hidden');
}
/* Part 2, 3: open and close modal End */

/* Part 4: create post */
function createpost()
{

	var posts = document.createElement('div');
	var text = document.getElementById("post-text-input").value;
	var price = document.getElementById("post-price-input").value;
	var city = document.getElementById("post-city-input").value; 
	var photo = document.getElementById("post-photo-input").value;
	
	posts.classList.add('post');
	posts.setAttribute('data-price', price);
	posts.setAttribute('data-city', city);
	posts.setAttribute('data-condition', check_box('post-condition'));

	var innercontent = document.createElement('div');
	innercontent.classList.add('post-contents');
	posts.appendChild(innercontent);

	var imagecontent = document.createElement('img');
	imagecontent.src = photo;
	imagecontent.alt = text;
	posts.appendChild(imagecontent);

	var infocontent = document.createElement('div');
	infocontent.classList.add('post-info-container');
	posts.appendChild(infocontent);

	var titleinfo = document.createElement('a');
	titleinfo.href = '#';
	titleinfo.classList.add('post-title');
	titleinfo.textContent = text;
	posts.appendChild(titleinfo);

	var priceinfo = document.createElement('span');
	priceinfo.classList.add('post-price');
	priceinfo.textContent = '$' + price;
	posts.appendChild(priceinfo);
	
	var cityinfo = document.createElement('span');
	cityinfo.classList.add('post-city');
	cityinfo.textContent = "(" + city + ")";
	posts.appendChild(cityinfo);

	if(emptycheck())
	{
		document.getElementById('posts').appendChild(posts);
		add_city_filter(city);
		allposts.push(posts);
		reset();
	}
}

function add_city_filter(city)
{
	var citylist = document.getElementById("filter-city");
	var newcity = document.createElement('option');
	var check_city = document.createElement('option');
	check_city.textContent = city.toLowerCase();
	for(var i = 0 ; i < city.length ; i++)
	{
		if(i == 0)
		{
			newcity.textContent = city[i].toUpperCase();
		}
		else
		{
			newcity.textContent += city[i];
		}
		
	}

	for(var i = 0 ; i < citylist.length ; i++)
	{
		if(check_city.textContent == citylist[i].textContent.toLowerCase())
		{
			break;
		}
		else if(i == citylist.length - 1)
		{
			citylist.appendChild(newcity);
		}
	}
}

var createpost_button = document.querySelector('#modal-accept');
createpost_button.addEventListener('click', createpost);

/* Part 4: create post End */

/* part 5: check input field */
function emptycheck()
{
	var inputs = document.querySelectorAll('.modal-body input');
	for(var i = 0 ; i < 4 ; i++)
	{
		if(inputs[i].value == "")
		{
			alert("Please enter all parts")	
			return false;
		}
	}
	return true;
}
/* part 5: check input field End */
