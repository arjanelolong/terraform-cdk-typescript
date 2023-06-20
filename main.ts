// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import AWSResources from './resources/aws'
import { Config } from './types';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: Config) {
    super(scope, id);

    AWSResources({ stack: this, config });
  }
}

const app = new App();

new MyStack(app, 'dev', { environment: 'dev', region: 'ap-southeast-1' });
new MyStack(app, 'stg', { environment: 'stg', region: 'ap-southeast-1' });
new MyStack(app, 'prd', { environment: 'prd', region: 'eu-west-2' });
app.synth();
