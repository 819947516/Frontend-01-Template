// https://webpack.js.org/api/node/#compiler-instance

var Generator = require('yeoman-generator')

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    // method1() {
    //     this.log('method 1 just ran');
    // }

    collecting() {
        this.log('collecting')
    }

    copyTpl() {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
        )

        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        )
        
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        )

        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        )

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        )

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: 'Templating with Yeoman' }
        )

        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        )

        this.fs.copyTpl(
            this.templatePath('createElement.js'),
            this.destinationPath('src/createElement.js')
        )

        this.fs.copyTpl(
            this.templatePath('gesture/index.js'),
            this.destinationPath('src/gesture/index.js')
        )

        this.fs.copyTpl(
            this.templatePath('animation/index.js'),
            this.destinationPath('src/animation/index.js')
        )

        this.fs.copyTpl(
            this.templatePath('animation/cubicBezier.js'),
            this.destinationPath('src/animation/cubicBezier.js')
        )

        this.fs.copyTpl(
            this.templatePath('compoents/carousel.css'),
            this.destinationPath('src/compoents/carousel.css')
        )

        this.fs.copyTpl(
            this.templatePath('compoents/Carousel.js'),
            this.destinationPath('src/compoents/Carousel.js')
        )

        this.fs.copyTpl(
            this.templatePath('test/main.test.js'),
            this.destinationPath('test/main.test.js')
        )

    }

    installingNPM() {
        this.npmInstall([
            'webpack',
            'webpack-cli',
            'webpack-dev-server',
            'html-webpack-plugin',
            'babel-loader',
            '@babel/core',
            '@babel/preset-env',
            '@babel/plugin-transform-react-jsx',
            '@babel/register',
            '@istanbuljs/nyc-config-babel',
            'babel-plugin-istanbul',
            'nyc',
            'mocha'
        ], { 'save-dev': true });
    }
};