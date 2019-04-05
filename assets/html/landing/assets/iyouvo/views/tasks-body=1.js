iY.taskInfoPopover = function(el, taskAttrs) {
  $(el).popover({
    content: iY.template('tasks/task_info', taskAttrs),
    html: true,
    title: 'Opportunity',
    trigger: 'hover'
  });
};
