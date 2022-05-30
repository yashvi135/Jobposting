import './App.scss';
import React,{useState} from 'react';
import Axios  from 'axios';


const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === " " ? addTags(event) : null}
				placeholder="+ Add Job Tags"
			/>
		</div>
	);
};


function App() {


  const url="https://localhost:8080/";
  const[data,setData]=useState({
    title:"",
    location:"",
    min:"",
    max:"",
    subject:"",
    category:"",
    functionalarea:"",
    mingrad:"",
    maxgrad:"",
    tagid:""

  })
  function submit(e){
    e.preventDefault();
    Axios.post(url,{
      title:data.title,
      location:data.location,
      min:data.min,
      max:data.max,
      subject:data.subject,
      category:data.category,
      functionalarea:data.functionalarea,
      mingrad:data.mingrad,
      maxgrad:data.maxgrad,
      tagid:data.tagid
    })

    .then(res=>{
      console.log(res.data)
    })
  }
  function handle(e){
    const newdata ={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
    console.log(newdata);
  }
  
  const selectedTags = tags => {
		console.log(tags);
	};

  return (
    <div className="App">

        <h2>Post Job</h2>
        <h1>Basic Details</h1>
        <hr />
        <form onSubmit={(e)=>submit(e)}>
        <label> Job Title*</label><br />
            <input onChange={(e)=> handle(e)} id="title" value={data.title} type='text' placeholder='Write a title that appropriately describes this job' required />
        <br />
        <label>Location*</label><br />
        <input type='text' onChange={(e)=> handle(e)} id="location" value={data.location} placeholder="+ Add location" required />
        <br />
        <label>Years of Experience*</label><br />
        <select onChange={(e)=> handle(e)} id="min" value={data.min} required>
          <option value="none" selected disabled>Select Min</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select onChange={(e)=> handle(e)} id="max" value={data.max} required>
          <option value="none" selected disabled>Select Max</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <br />
        <label for="subject">Job Description*</label><br />
        <textarea onChange={(e)=> handle(e)}  id="subject" value={data.subject} name="subject" placeholder="Write something.." spellcheck="true" required></textarea><br />
        <h1>Targeting</h1><hr />
        <table>
          <tr><td>
        <label>Category*</label><br />
        <select onChange={(e)=> handle(e)} id="category" value={data.category} required>
          <option value="none" selected disabled>Select</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select></td><td>
        <label>functional Area*</label><br />
        <select onChange={(e)=> handle(e)} id="functionalarea" value={data.functionalarea} required>
          <option value="none" selected disabled>Select</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select></td></tr><br />
        </table>
        <label>Graduating Year*</label><br />
        <select onChange={(e)=> handle(e)} id="mingrad" value={data.mingrad} required>
          <option value="none" selected disabled>Min Batch</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select onChange={(e)=> handle(e)} id="maxgrad" value={data.maxgrad} required>
          <option value="none" selected disabled>Max Batch</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <br /> 
        <label>Tags*</label><br />
        <TagsInput onChange={(e)=> handle(e)} id="tagid" value={data.tagid} selectedTags={selectedTags}  tags={['Nodejs', 'MongoDB']}/>
        {/* <input type='text' placeholder="+ Add Job Tags" required /> */}
        <br />   
        
        <input type="submit" value="Post Job" />
        <input type="button" value="Post Job and Add another Job" />
        <input type="reset" value="cancel" />
        </form>

    </div>
  );
}

export default App;