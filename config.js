const config = {
    port: 5001,
    connectionString: "postgres://xzibcxxvcpcfkj:51e467bf4f0cd0af85b212711b94ce58f20293452cc689f42033011fdfa9cb32@ec2-54-161-208-31.compute-1.amazonaws.com:5432/dbf3nqfpiauptq"
  };
  const production = {
  };
  const development = {
  };
  
  let environment = process.env.NODE_ENV || 'development';
  console.log('Loaded Configs : ' + environment);
  module.exports = Object.assign(config, eval(environment));
  