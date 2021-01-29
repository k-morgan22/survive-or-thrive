import Area from '../models/area.js'

const resolvers = {
  Query: {
    areas: function(){                     
      return Area.find({});
    },
    area: function(parent, args){
      return Area.findById(args.id)
    }
  },
  Mutation: {
    createArea: function(parent, args){
      let area = new Area(args.areaInput);
      return area.save();
    },
    deleteArea: function(parent, args){
      return Area.findByIdAndRemove(args.id);
    },
    updateArea: function(parent, args){
      return Area.findByIdAndUpdate(args.id, args.areaInput, {new: true});
    }
  }
}


export default resolvers