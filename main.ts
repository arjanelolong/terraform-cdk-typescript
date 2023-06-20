// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { Instance } from '@cdktf/provider-aws/lib/instance';


interface MyStackConfig {
  environment: string;
  region?: string;
}

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: MyStackConfig) {
    super(scope, id);

    const { region, environment } = config

    new AwsProvider(this, 'aws', {
      region,
    });

    new Instance(this, `ec2-${environment}`, {
      ami: 'ami-2757f631',
      instanceType: 't2.micro',
      tags: {
        terraform: 'TRUE',
      },
    });

  }
}

const app = new App();

new MyStack(app, 'dev', { environment: 'dev', region: 'ap-southeast-1' });
new MyStack(app, 'stg', { environment: 'stg', region: 'ap-southeast-1' });
new MyStack(app, 'prd', { environment: 'prd', region: 'eu-west-2' });
app.synth();
