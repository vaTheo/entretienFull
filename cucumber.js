module.exports = {
    default: {
      requireModule: ['ts-node/register'],
      require: ['src/BoilerPlate/tests/steps/*.ts'],
      paths: ['src/BoilerPlate/tests/features/*.feature'],
      format: ['progress-bar', 'html:cucumber-report.html'],
      formatOptions: { snippetInterface: 'async-await' }
    }
  };