var timeline =[]


var filename;
function make_filename(){
    filename="Feedback_V1_"+jsPsych.data.getURLVariable("q"); //Added the "Feedback_"+ to the start of this to identify these data files
    console.log(filename);
    console.log(jsPsych.data.getURLVariable("q"));
}

var call_make_filename = {
    type: 'call-function',
    func: function(){
	make_filename();
	console.log("feedback filename");
	console.log(filename);
    },
};

timeline.push(call_make_filename)



// Feedback Questions:

var feedback_q1 = {
    type:'survey-multi-choice',
    questions: [
	{ prompt: "Did you learn a game strategy while playing to gain the most points?",
    name: 'feedback_q1',
    options: ['Yes', 'No - I did not understand how to play the game at all'],
    required: true
	 }
  ]
};
timeline.push(feedback_q1)

var feedback_q2 = {
  type:'survey-text',
  questions:[
    {prompt:"Please provide any feedback on the study that you think may be useful to our research:",required:true, rows:10}
  ]
};
  timeline.push(feedback_q2)

var feedback_q3 = {
  type:'survey-text',
  questions:[
    {prompt:"If we ran this study again and you were asked to complete these same tasks once a day for 2 weeks, would you be happy to do this? If no, please state why this would be an issue:",required:true, rows:10}
  ]
};
  timeline.push(feedback_q3)

//_____________________________________________________________________________________________________________________________________________________________________________________
//---Save data


function saveData(){
    console.log("in save data");
    console.log(filename);
    $.ajax({
     type:'post',
     cache: false,
      data: {filename: filename, filedata: jsPsych.data.get().json()},
      url: 'save_data.php',
  });
}


var save = {
    type: 'call-function',
    func: function(){
	console.log("in save")
	saveData();
    },
};

timeline.push(save)

var finish = {
    type: 'external-html',
    url: function(){
	return "finish.html";
    }
};

timeline.push(finish)


  jsPsych.init({
    timeline: timeline,
    override_safe_mode: true
  });
