/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { i18n } from '@kbn/i18n';
import React, { Fragment } from 'react';
import {
  EuiSpacer,
  EuiCodeBlock,
  EuiLink,
  EuiText
} from '@elastic/eui';
import { Monospace } from '../components/monospace';
import { FormattedMessage } from '@kbn/i18n/react';
import { ELASTIC_WEBSITE_URL, DOC_LINK_VERSION } from 'ui/documentation_links';
import { getMigrationStatusStep, getSecurityStep } from '../common_instructions';

export function getKibanaInstructionsForEnablingMetricbeat(product, _meta, {
  esMonitoringUrl,
}) {
  const securitySetup = getSecurityStep(
    `${ELASTIC_WEBSITE_URL}guide/en/kibana/reference/${DOC_LINK_VERSION}/monitoring-metricbeat.html`
  );

  const installMetricbeatStep = {
    title: i18n.translate('xpack.monitoring.metricbeatMigration.kibanaInstructions.installMetricbeatTitle', {
      defaultMessage: 'Install Metricbeat on the same server as Kibana'
    }),
    children: (
      <EuiText>
        <p>
          <EuiLink
            href={`${ELASTIC_WEBSITE_URL}guide/en/beats/metricbeat/${DOC_LINK_VERSION}/metricbeat-installation.html`}
            target="_blank"
          >
            <FormattedMessage
              id="xpack.monitoring.metricbeatMigration.kibanaInstructions.installMetricbeatLinkText"
              defaultMessage="Follow the instructions here."
            />
          </EuiLink>
        </p>
      </EuiText>
    )
  };

  const enableMetricbeatModuleStep = {
    title: i18n.translate('xpack.monitoring.metricbeatMigration.kibanaInstructions.enableMetricbeatModuleTitle', {
      defaultMessage: 'Enable and configure the Kibana x-pack module in Metricbeat'
    }),
    children: (
      <Fragment>
        <EuiCodeBlock
          isCopyable
          language="bash"
        >
          metricbeat modules enable kibana-xpack
        </EuiCodeBlock>
        <EuiSpacer size="s"/>
        <EuiText>
          <p>
            <FormattedMessage
              id="xpack.monitoring.metricbeatMigration.kibanaInstructions.enableMetricbeatModuleDescription"
              defaultMessage="By default the module will collect Kibana monitoring metrics from http://localhost:5601. If the local Kibana instance has a different address, you must specify it via the {hosts} setting in the {file} file."
              values={{
                hosts: (
                  <Monospace>hosts</Monospace>
                ),
                file: (
                  <Monospace>modules.d/kibana-xpack.yml</Monospace>
                )
              }}
            />
          </p>
        </EuiText>
        {securitySetup}
      </Fragment>
    )
  };

  const configureMetricbeatStep = {
    title: i18n.translate('xpack.monitoring.metricbeatMigration.kibanaInstructions.configureMetricbeatTitle', {
      defaultMessage: 'Configure Metricbeat to send to the monitoring cluster'
    }),
    children: (
      <Fragment>
        <EuiText>
          <FormattedMessage
            id="xpack.monitoring.metricbeatMigration.kibanaInstructions.configureMetricbeatDescription"
            defaultMessage="Make these changes in your {file}."
            values={{
              file: (
                <Monospace>metricbeat.yml</Monospace>
              )
            }}
          />
        </EuiText>
        <EuiSpacer size="s"/>
        <EuiCodeBlock
          isCopyable
        >
          {`output.elasticsearch:
  hosts: [${esMonitoringUrl}] ## Monitoring cluster

  # Optional protocol and basic auth credentials.
  #protocol: "https"
  #username: "elastic"
  #password: "changeme"
`}
        </EuiCodeBlock>
        {securitySetup}
      </Fragment>

    )
  };

  const startMetricbeatStep = {
    title: i18n.translate('xpack.monitoring.metricbeatMigration.kibanaInstructions.startMetricbeatTitle', {
      defaultMessage: 'Start Metricbeat'
    }),
    children: (
      <EuiText>
        <p>
          <EuiLink
            href={`${ELASTIC_WEBSITE_URL}guide/en/beats/metricbeat/${DOC_LINK_VERSION}/metricbeat-starting.html`}
            target="_blank"
          >
            <FormattedMessage
              id="xpack.monitoring.metricbeatMigration.kibanaInstructions.startMetricbeatLinkText"
              defaultMessage="Follow the instructions here."
            />
          </EuiLink>
        </p>
      </EuiText>
    )
  };

  const migrationStatusStep = getMigrationStatusStep(product);

  return [
    installMetricbeatStep,
    enableMetricbeatModuleStep,
    configureMetricbeatStep,
    startMetricbeatStep,
    migrationStatusStep
  ];
}
