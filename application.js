function Batch(batch_type, bake_time){
  this.batch_type = batch_type;
  this.bake_time = bake_time;
  this.timeBaked = 0;
}

Batch.prototype.status = function() {
  if (this.timeBaked === 0 ) {
    return ("raw");
  } else if (this.timeBaked < this.bake_time) {
    return ("still_gooey");
}
  if (this.timeBaked == this.bake_time) {
    return("just_right");
}
  if (this.timeBaked > this.bake_time) {
    return ("crispy");
  }
};

function PrepTable(){
  this.queue = [];
}
PrepTable.prototype.add_batch = function(batch) {
  this.queue.push(batch);
};
PrepTable.prototype.remove = function(batch){
  this.queue.splice(batch, 1);
};

function Oven(){
  this.racks = [];
}

Oven.prototype.add_batch_to_oven = function(batch) {
  if (this.racks.length < 3) {
  this.racks.push(batch);

  }
  else alert('hi');
};
Oven.prototype.bake = function (){
  $.each( this.racks, function( rack, batch ){
    batch.timeBaked ++;
    update_status(rack, batch);
 });
};

function update_status(rack , batch) {
    batch.status();
    $("td#rack_" + rack).addClass(batch.status()).text(batch.batch_type + " [" + (batch).status() + "]");
  }

$(document).ready(function(){
  var prep_table1 = new PrepTable();
  var oven1 = new Oven();
  $("#new_batch").on('submit', function(event){
      event.preventDefault();
        var batch_type = ($('#batch_type').val());
        var bake_time = ($('#bake_time').val());
        var batch = new Batch(batch_type, bake_time);

        prep_table1.add_batch(batch);
      $('#prep_batches').append('<li>' + $('#batch_type').val() + '<button class="add_to_oven">Put in oven</button>' + '</li>');
    });

  $("#prep_batches").on('click', ".add_to_oven", function(){
    var index = $(this).parent().index();
    var batch = prep_table1.queue[index];

    $("td#rack_" + oven1.racks.length).addClass(batch.status()).text(batch.batch_type + " [" + (batch).status() + "]");  //("<td>" + (batch).batch_type + "<span class='status'>" + "[" + (batch).status() + "]" + "</span>" + "</td>")
      oven1.add_batch_to_oven(batch);
      prep_table1.remove(batch);
    $(this).parent().remove();

  });
  $("#bake").on('click', function(){
    oven1.bake();
  });

});
