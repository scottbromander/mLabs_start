module.exports = function(grunt) {
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       uglify: {
         build: {
            src: 'client/script/client.js',
            dest: 'server/public/scripts/client.min.js'
         }
       },
       copy: {
         main : {
           expand: true,
           cwd: "node_modules/jquery/dist/",
           src: [
              "jquery.js"
           ],
           dest: "server/public/vendors/jquery/"
         },
         html : {
           expand: true,
           cwd: "client/views/",
           src: [
              "index.html"
           ],
           dest: "server/public/views/"
         },
         bootstrap : {
           expand: true,
           cwd: "node_modules/bootstrap/dist/css/",
           src: [
              "bootstrap.css"
           ],
           dest: "server/public/vendors/bootstrap/"
         }
       },
       watch: {
        files: ['client/script/*.js',
                'client/views/*.html'],
        tasks: ['uglify', 'copy']
      }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'uglify', 'watch']);
};
