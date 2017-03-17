db.cars.insert({
   'name': 'honda',
   'make': 'accord',
   'year': '2010'
})

db.cars.update({
   'name': 'honda'
  },
  {$set:{
    'name': 'ford'
  }
})

# add new field to document

db.cars.update({
  'name': 'ford'
  },
  {$set:{
    transmission: 'automatic'
  }
},{$upsert:true})


for( var i = 0; i < 10; i++){
   db.cars.insert({ "value" : i});
}