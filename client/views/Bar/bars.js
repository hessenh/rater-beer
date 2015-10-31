Template.bars.helpers({
	location: function () {
		console.log(Geolocation.currentLocation())
		//var latlng = [Geolocation.currentLocation().coords.latitude, Geolocation.currentLocation().coords.longitude]
		//Session.set("latlng",latlng)
	},
	near_by_bars: function () {
		return Bars.find({});
	}
});