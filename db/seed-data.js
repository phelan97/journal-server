const users = [
  {
    _id: "000000000000000000000001",
    email: "foobar",
    password: "$2a$10$Pyh/48hu9P3zjbO/ouOJfOnoo2CSFD7Rwpm.CQMXoUXofpGYm4NQ2"
  }
];

const entries = [
  {
    _id: "222222222222222222222221",
    userId: "000000000000000000000001",
    
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel justo in diam dictum porta ac aliquam lorem. Donec vehicula augue vitae turpis malesuada fringilla. Etiam maximus rhoncus nisi non elementum. Aenean at mauris tellus. Etiam cursus mauris neque, ac suscipit sem volutpat ac. Nam viverra mauris urna, sit amet feugiat nunc lobortis a. Nam vel commodo libero, at scelerisque urna.

    Aliquam volutpat erat mi, non commodo enim convallis id. Aliquam erat volutpat. Proin sit amet enim eu eros lacinia aliquam. Nulla enim augue, sodales laoreet augue at, euismod sollicitudin elit. Nulla tempus in lacus ut venenatis. Quisque eleifend velit purus, id scelerisque tortor aliquam vel. Curabitur ut hendrerit arcu. Nunc pretium venenatis diam bibendum euismod.
    
    Proin fringilla ornare ipsum feugiat ultrices. In hac habitasse platea dictumst. Aliquam sollicitudin lorem vitae quam pharetra, vitae blandit nisl posuere. Aenean sagittis ex eu felis semper, non sagittis eros interdum. In malesuada consequat tempus. Proin turpis ex, vehicula eget pellentesque at, imperdiet sed mauris. Donec et urna consectetur, maximus lacus non, malesuada mauris. Proin venenatis quam at risus vestibulum, sodales gravida ante blandit. Morbi urna est, interdum vel rutrum sed, accumsan eget eros. Nam ultricies nibh lectus, elementum sodales diam sagittis ac.
    
    Quisque vitae ante dignissim, imperdiet justo in, interdum felis. Sed elementum sed enim quis tincidunt. Cras fermentum pulvinar nulla, ac sagittis justo ultrices ac. Pellentesque cursus enim et felis euismod, et pharetra magna mollis. Suspendisse ut urna sit amet lacus volutpat viverra. Nullam viverra orci a tellus hendrerit semper. Fusce vel dui efficitur, mattis metus et, fermentum elit. Aliquam hendrerit luctus sem, placerat pharetra nisl ornare eu. Etiam finibus mauris id mi viverra, at semper lacus laoreet. Cras libero dolor, tincidunt eu imperdiet vitae, pellentesque ut leo. Suspendisse potenti. Curabitur hendrerit nibh eget nulla aliquet mattis. Duis vitae tortor lacinia, finibus ante eget, sollicitudin ligula. Maecenas varius ullamcorper velit. Vivamus vehicula congue lacus, porttitor molestie nibh efficitur a.
    
    Vivamus fermentum elit ac justo aliquet, eu aliquam elit consequat. Nunc ligula neque, efficitur a risus et, bibendum feugiat urna. Proin tempus iaculis neque ac ultrices. Integer ornare tristique efficitur. Aliquam et felis eu dolor gravida placerat. Ut efficitur suscipit risus, a ultricies quam feugiat sed. Vivamus ullamcorper purus non bibendum convallis. Praesent volutpat consectetur auctor. Maecenas dictum sollicitudin diam nec mattis.`,

    date: Date.now()
  },

  {
    _id: "222222222222222222222223",
    userId: "000000000000000000000001",
    
    content: 'Dummy journal data generated from the seed command',
    date: (new Date(2018, 10, 15)).getTime()
  },

  {
    _id: "222222222222222222222225",
    userId: "000000000000000000000001",
    
    content: 'These posts should be filled with the dummy user data',
    date: (new Date(2018, 9, 1)).getTime()
  }
];

module.exports = {users, entries};