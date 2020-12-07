import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import SimplifiedRoot from './components/SimplifiedAnalysis/SimplifiedRoot';
import DetailedRoot from './components/DetailedAnalysis/DetailedRoot';
import './custom.css'

function App() {
    return (
      <Layout>
        <Switch>
            <Route exact path={['/', '/simplified']} component={SimplifiedRoot} />
            <Route exact path='/detailed' component={DetailedRoot} />
        </Switch>
      </Layout>
    );
}

export default App;