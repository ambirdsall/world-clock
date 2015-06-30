import Ember from 'ember';

export default Ember.Controller.extend({
  // create array of timezones with name and offset
  init: function() {
    var timezones = [];
    for (var i in moment.tz._zones) {
      var currentTimezone = moment.tz.unpack(moment.tz._zones[i]);

      timezones.push({
        name:   currentTimezone.name,
        offset: currentTimezone.offsets[0]
      });
      this.set('timezones', timezones);
      this._super();
    }
  },
  selectedTimezone: null,
  actions: {
    // adds a timezone record to the offline store
    add: function() {
      var timezone = this.store.createRecord('timezone', {
        name:   this.get('selectedTimezone').name,
        offset: this.get('selectedTimezone').offset
      });
      timezone.save();
    },
    // destroy a timezone record
    remove: function(timezone) {
      // debugger;
      timezone.destroyRecord();
    }
  }
});
