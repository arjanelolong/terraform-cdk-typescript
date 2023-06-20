import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { Instance } from '@cdktf/provider-aws/lib/instance';
import { defaultTags } from '../../lib/contants';
import { Stack } from '../../types';

export default (params: Stack ) =>{
  const { stack, config } = params
  const { region, environment } = config

  new AwsProvider(stack, 'aws', {
    region,
  });

  new Instance(stack, `ec2-${environment}`, {
    ami: 'ami-2757f631',
    instanceType: 't2.micro',
    tags: {
      ...defaultTags,
      environment,
    },
  });
}