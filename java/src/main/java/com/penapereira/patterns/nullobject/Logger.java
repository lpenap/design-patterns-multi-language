package com.penapereira.patterns.nullobject;

/** The abstract object: the collaborator every client depends on. */
public interface Logger {

    void log(String message);
}
