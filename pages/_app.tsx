import React from 'react';
import App, { Container } from 'next/app';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { Database } from '@nozbe/watermelondb';

export default class MyApp extends App {
  state = {
    database: null
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  async componentDidMount() {
    const LokiJSAdapter = (await import('@nozbe/watermelondb/adapters/lokijs')).default;

    const schema = (await import('../model/schema')).default;
    const Comment = (await import('../model/Comment')).default; // ⬅️ You'll import your Models here

    // First, create the adapter to the underlying database:
    const adapter = new LokiJSAdapter({
      schema,
    });

    // Then, make a Watermelon database from it!
    const database = new Database({
      adapter,
      modelClasses: [
        Comment, // ⬅️ You'll add Models to Watermelon here
      ],
      actionsEnabled: true,
    });

    this.setState({ database });
  }

  render () {
    const { Component, pageProps } = this.props;
    const { database } = this.state;

    return (
      <Container>
        {database ? <DatabaseProvider database={database}>
          <Component {...pageProps} />
        </DatabaseProvider> : <p>Loading database...</p>}
      </Container>
    )
  }
}