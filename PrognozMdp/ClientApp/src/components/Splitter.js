import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const Splitter = () => (
    <SplitterLayout primaryIndex={1} secondaryInitialSize={250}>
        <div>1st</div>
        <SplitterLayout secondaryInitialSize={250}>
            <SplitterLayout vertical secondaryInitialSize={250}>
                <div>2nd</div>
                <SplitterLayout secondaryInitialSize={250}>
                    <div>3rd</div>
                    <div>4th</div>
                </SplitterLayout>
            </SplitterLayout>
            <div>5th</div>
        </SplitterLayout>
    </SplitterLayout>
);